import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('public/workers',{recursive:true});
await copyFile('node_modules/pdfjs-dist/build/pdf.worker.min.mjs','public/workers/pdf.worker.min.mjs');
