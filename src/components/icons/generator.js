const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo'); // npm install svgo

const inputFolder = path.resolve(__dirname, '../../../assets/icons'); // your SVG folder
const outputFile = path.resolve(__dirname, 'index.js'); // output JS file

if (!fs.existsSync(inputFolder)) {
    console.log("❌ Can't find folder: " + inputFolder);
    process.exit(1);
}

const iconList = [];
let allComponents = [];
let iconKeys = [];

// Read SVG files
fs.readdirSync(inputFolder).forEach(file => {
    if (!file.endsWith('.svg')) return;

    // Generate PascalCase component name
    const str = file.replace('.svg', '');
    const arr = str.split('.');
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    const componentName = "Icon" + arr.join("");

    // Normalized key for iconMap (lowercase, dots removed)
    const keyName = str.replace(/\./g, '').toLowerCase();
    iconList.push({ keyName, componentName });
    iconKeys.push(keyName);

    // Read and optimize SVG
    let svgContent = fs.readFileSync(path.join(inputFolder, file), 'utf-8');
    try {
        svgContent = optimize(svgContent, {
            multipass: true,
            plugins: [
                'removeDimensions',
                { name: 'removeAttrs', params: { attrs: '(class|style)' } },
            ],
        }).data;
    } catch (e) {
        console.warn(`⚠️ SVGO optimization failed for ${file}, using raw SVG`);
    }

    svgContent = svgContent
        .replace(/fill="#000000"/g, 'fill="currentColor"')
        .replace(/fill="black"/g, 'fill="currentColor"')
        .replace(/stroke="black"/g, 'stroke="currentColor"');

    // Create memoized JS component
    allComponents.push(`
const ${componentName} = React.memo(({ size = 24, color = "black" }) => {
  const svg = \`${svgContent}\`;
  return <SvgXml xml={svg} width={size} height={size} color={color} />;
});
`);
});

// Generate iconMap
let iconMapStr = 'const iconMap = {\n';
iconList.forEach(ic => {
    iconMapStr += `  '${ic.keyName}': ${ic.componentName},\n`;
});
iconMapStr += '};\n\n';

// Generate JSDoc typedef string
const iconNamesString = iconKeys.map(k => `'${k}'`).join('|');
const jsdoc = `
/**
 * @typedef {Object} PropsIcons
 * @property {${iconNamesString}} name - The name of the icon (recommended values).
 * @property {number} [size] - The size of the icon.
 * @property {string} [color] - The color of the icon.
 */

/**
 * Icon component
 * @param {PropsIcons} props - The properties for the Icons component.
 */
`;

// Generate main component
const mainComponent = `
import React from 'react';
import { SvgXml } from 'react-native-svg';

${allComponents.join('\n')}

${iconMapStr}

${jsdoc}

export default function Icons({ name, ...props }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component {...props} />;
}
`;

// Write output
fs.writeFileSync(outputFile, mainComponent);
console.log("✅ index.js generated with JSDoc typedef for PropsIcons");