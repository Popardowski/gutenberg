#!/usr/bin/env node

const path = require( 'path' );
const childProcess = require( 'child_process' );

const packages = [
	'e2e-test-utils',
	'rich-text',
];

const getArgsForPackage = ( packageName ) => {
	switch ( packageName ) {
		case 'rich-text':
			return [
				`packages/${ packageName }/src/index.js`,
				`--output packages/${ packageName }/README.md`,
				'--to-token',
				'--ignore "^unstable|^apply$|^changeListType$"',
			];
		default:
			return [
				`packages/${ packageName }/src/index.js`,
				`--output packages/${ packageName }/README.md`,
				'--to-token',
			];
	}
};

let aggregatedExitCode = 0;
packages.forEach( ( packageName ) => {
	const args = getArgsForPackage( packageName );
	const pathToDocGen = path.join( __dirname, '..', 'node_modules', '.bin', 'docgen' );
	const { status, stderr } = childProcess.spawnSync(
		pathToDocGen,
		args,
		{ shell: true },
	);
	if ( status !== 0 ) {
		aggregatedExitCode = status;
		process.stderr.write( `${ stderr }\n` );
	}
} );

process.exit( aggregatedExitCode );
