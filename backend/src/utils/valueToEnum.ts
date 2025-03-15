export function valueToEnum<T extends object>(enumObj: T, str: string): T[keyof T] {
    const enumKey = Object.keys(enumObj).find(key => key.toLowerCase() === str.toLowerCase());
    if (enumKey) {
      return enumObj[enumKey as keyof T];
    } else {
      throw new Error(`Invalid value for enum: ${str}`);
    }
  }
  