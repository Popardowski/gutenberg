#!/usr/bin/env node

const path = require( 'path' );
const childProcess = require( 'child_process' );

const packages = [
	'e2e-test-utils',
	'rich-text',
];

const getArgsForPackage = ( packageName ) => {
	const defaultArgs = [
		`packages/${ packageName }/src/index.js`,
		`--output packages/${ packageName }/README.md`,
		'--to-token',
	];

	const argsForPackage = {
		'rich-text': [
			`packages/${ packageName }/src/index.js`,
			`--output packages/${ packageName }/README.md`,
			'--to-token',
			'--ignore "^unstable|^apply$|^changeListType$"',
		],
	};

	return argsForPackage[ packageName ] || defaultArgs;
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
