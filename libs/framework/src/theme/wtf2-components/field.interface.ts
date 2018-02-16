export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
}

export interface ButtonExpandCardConfig {
  avatar?: string;
  title?: string;
  description?: string;
  leftAction?: string;
  rightAction?: string;

  action?: string;
}

export interface ButtonMenuConfig {
  label?: string;
  icon?: string;
  triggerFor?: string;
  submenu?: ButtonMenuConfig[];
  // title?: string;
  // description?: string;
  // leftAction?: string;
  // rightAction?: string;
}

export interface ButtonConfig {
  label?: string;
  icon?: string;
  selected?: boolean;
  type?:string;
  card?: ButtonExpandCardConfig[];
  menus?: ButtonMenuConfig[];
  triggerFor?: string;
  action?: string;
  search?: boolean;
  color?: string;

}

export interface SplitButtonConfig {
  label?: string;
  menus?: ButtonMenuConfig[];
  action?: string;
}

export interface ShipData {
  vesselId: string;
  vesselName: string;
  ircs?: string;
  countryCode: string;
  vesselStatus: string;
  grossTonnage?: number;
  hullNumber?: string;
  vesselType: string;
  jonesActEligible: boolean;
  disabledDate?: string;
}

export interface col {
  recid: number;
  colname:string;
  displayName:string;
  isSummery:number;
}

// export const buttonData: ButtonConfig[] = []