const PDFMerger = require("pdf-merger-js");
const fs = require("fs");
const path = require("path");
var merger = new PDFMerger();

const mergePdfs = async (p1, p2) => {
	const merger = new PDFMerger();
	await merger.add(p1); //merge all pages. parameter is the path to file and filename.
	await merger.add(p2); // merge only page 2
	let d = new Date().getTime();
	await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document

	// Delete the original PDFs
	setTimeout(() => {
		fs.unlinkSync(p1);
		fs.unlinkSync(p2);
	}, 5000);

	// Delete the merged PDF after 5 minutes
	setTimeout(() => {
		fs.unlinkSync(mergedPdfPath);
	}, 300000); // 300000 = 5 minutes

	return d;

	// Export the merged PDF as a nodejs Buffer
	// const mergedPdfBuffer = await merger.saveAsBuffer();
	// fs.writeSync('merged.pdf', mergedPdfBuffer);
};

module.exports = { mergePdfs };
