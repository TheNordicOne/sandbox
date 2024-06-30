import type { ObjectValues } from './type-helpers';

// Pseudo Enum

// For typesafe access
const LOG_LEVEL = {
	DEBUG: 'DEBUG',
	WARNING: 'WARNING',
	ERROR: 'ERROR',
} as const;

type LogLevel = ObjectValues<typeof LOG_LEVEL>;

function log(message: string, level: LogLevel) {
	console.log(`${LOG_LEVEL[level]}: ${message}`);
}

// For use with built-in mapping
const FRIENDLY_LOG_LEVEL = {
	FRIENDLY_DEBUG: 'Debug',
	FRIENDLY_WARNING: 'Warning',
	FRIENDLY_ERROR: 'Error',
} as const;

type FriendlyLogLevel = keyof typeof FRIENDLY_LOG_LEVEL;

function friendlyLog(message: string, level: FriendlyLogLevel) {
	console.log(`${FRIENDLY_LOG_LEVEL[level]}: ${message}`);
}

export function pseudoEnumDemo() {
	log('Log Level via Object', LOG_LEVEL.DEBUG);
	log('Log Level via String', 'WARNING');

	friendlyLog('Friendly Log Level via String', 'FRIENDLY_WARNING');
}

// Actual Enum
// Just for comparison of generated code
enum EnumLogLevelNumber {
	DEBUG = 0,
	WARNING = 1,
	ERROR = 2,
}

enum EnumLogLevelString {
	DEBUG = 'Debug',
	WARNING = 'Warning',
	ERROR = 'Error',
}
