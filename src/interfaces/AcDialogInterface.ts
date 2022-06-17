export default interface AcDialogInterface {
  icon?: string;
  title: string;
  description: string;
  support?: string;
  actionLabel: string;
  secondaryActionLabel?: string;
  handleAction?(): any;
  handleSecondaryAction?(): any;
}
