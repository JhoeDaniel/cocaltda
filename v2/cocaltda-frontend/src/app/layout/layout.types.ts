export type Layout =
  | 'empty'
  | NavegacionDefault
  | NavegacionCompact
  | NavegacionFuturistic
  | NavegacionHorizontal;

export type NavegacionDefault = 'classic' | 'classy';
export type NavegacionCompact = 'compact' | 'dense' | 'thin';
export type NavegacionFuturistic = 'futuristic';
export type NavegacionHorizontal =
  | 'centered'
  | 'enterprise'
  | 'material'
  | 'modern';

export const _navegacionDefault: NavegacionDefault[] = ['classic', 'classy'];
export const _navegacionCompact: NavegacionCompact[] = [
  'compact',
  'dense',
  'thin',
];
export const _navegacionFuturistic: NavegacionFuturistic[] = ['futuristic'];

export const _navegacionHorizontal: NavegacionHorizontal[] = [
  'centered',
  'enterprise',
  'material',
  'modern',
];
