import fs from 'fs';
import path from 'path';

const audioDir = path.resolve('static');
const outputFile = path.resolve('static/audio-manifest.json');
let filesFound = 0;

// Recursive function to walk directories
function getAudioFiles(dir, base = '', output = {}) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		const relativePath = path.join(base, entry.name);

		if (entry.isDirectory()) {
			getAudioFiles(fullPath, relativePath, output);
		} else if (/\.(mp3|wav|ogg)$/i.test(entry.name)) {
			const folders = base.split(path.sep);
			const category = folders.splice(-1)[0];
			const character = folders.splice(-1)[0];

			const filepath = `/${relativePath.replace(/\\/g, '/')}`; // normalize slashes

			if (!output[character]) {
				output[character] = {};
			}

			if (!output[character][category]) {
				output[character][category] = [];
			}

			filesFound++;
			output[character][category].push(filepath);
		}
	}

	return output;
}

const audioFiles = getAudioFiles(audioDir);

fs.writeFileSync(outputFile, JSON.stringify(audioFiles, null, 2));

console.log(`Found ${filesFound} audio files.`);
console.log(`Created: ${outputFile}`);
