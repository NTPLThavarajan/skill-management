import { AbstractControl, ValidationErrors,Validators } from "@angular/forms"

export const EmpIdValidator =
    function EmpIdValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: number = control.value || '';

        if (value.toString().length <= 0)
            return getErrorObject(true, 'Employee Id is required');

        else if (value.toString().length != 4)
            return getErrorObject(true, 'Employee Id should be 4 digit');
        else
        return null;
    }

    export const EmpNameValidator =
    function SkillDescriptionValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';

        if (value.length <= 0)
            return getErrorObject(true, 'Name is required');

        else if (value.length > 0 && value.length > 25 )
            return getErrorObject(true, 'Name should be 25 characters');
        else
        return null;
    }
    export const MobileNoValidator =
    function SkillDescriptionValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: number = control.value || '';

        if (value.toString().length <= 0)
            return getErrorObject(true, 'MobileNo is required');

        else if (value.toString().length != 10)
            return getErrorObject(true, 'MobileNo should be 10 digit');
        else
        return null;
    }
    export const PwdValidator =
    function SkillDescriptionValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';

        if (value.length <= 0)
            return getErrorObject(true, 'Password is required');

        else if (value.length != 8 )
            return getErrorObject(true, 'Password should be 8 characters');
        else
        return null;
    }
    export const EmailValidator =
    function SkillDescriptionValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';
        let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
        if (value.length <= 0)
            return getErrorObject(true, 'Email Id is required');
        else if (! value.match(emailRegex) )
            return getErrorObject(true, 'Email Id format is example@ntpl.com');
        else
        return null;
    }
    
    