import { exhaustiveSwitchDemo } from './concepts/exhaustive_switch';
import { pseudoEnumDemo } from './concepts/pesudo-enums';

export function main() {
	pseudoEnumDemo();
	exhaustiveSwitchDemo({ table: 'users', userId: '1234' });
}

main();
