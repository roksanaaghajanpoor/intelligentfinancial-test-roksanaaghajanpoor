import { AbstractControl } from "@angular/forms";

export class MatchValidator {
    static Match(firstControlName, secondControlName): (AC: AbstractControl) => any {
      return (abstractControl: AbstractControl) => {
        let firstControlValue = abstractControl.get(firstControlName).value; 
        let secondControlValue = abstractControl.get(secondControlName).value;
        if (firstControlValue != secondControlValue) {
          abstractControl.get(secondControlName).setErrors({MatchFields: true});
        } else {
          if (abstractControl.get(secondControlName).hasError("MatchFields")) {
            abstractControl.get(secondControlName).updateValueAndValidity();
          }
          return null
        }
      };
    }
  }