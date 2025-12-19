
export interface PopupMenuItem<T> {
  label: string;
  icon: string;
  onSelect: (data: T | undefined) => void;
}
