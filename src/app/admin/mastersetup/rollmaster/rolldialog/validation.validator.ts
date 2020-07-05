import { AbstractControl, ValidationErrors } from "@angular/forms"

export const RollNameValidator =
    function RollNameValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';

        if (value.length <= 0)
            return getErrorObject(true, 'Roll Name is required');

        else if (value.length > 0 && value.length > 25)
            return getErrorObject(true, 'Roll Name should be 25 characters');

        return null;
    }

