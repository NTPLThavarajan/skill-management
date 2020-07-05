import { AbstractControl, ValidationErrors } from "@angular/forms"

export const SkillTypeValidator =
    function SkillTypeValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';

        if (value.length <= 0)
            return getErrorObject(true, 'Skill Type is required');

        else if (value.length > 0 && value.length > 25)
            return getErrorObject(true, 'Skill Type should be 25 characters');

        return null;
    }

export const SkillGroupValidator =
    function SkillGroupValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';

        if (value.length <= 0)
            return getErrorObject(true, 'Skill Group is required');

        return null;
    }

export const SkillNameValidator =
    function SkillNameValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';

        if (value.length <= 0)
            return getErrorObject(true, 'Skill Name is required');

        else if (value.length > 0 && value.length > 25)
            return getErrorObject(true, 'Skill Name should be 25 characters');

        return null;
    }

    export const SkillDescriptionValidator =
    function SkillDescriptionValidator(control: AbstractControl): ValidationErrors | null {
        let getErrorObject =
            function (ShowError, ErrMessage): ValidationErrors {
                return { ShowError, ErrMessage }
            }

        let value: string = control.value || '';

        if (value.length <= 0)
            return getErrorObject(true, 'Skill Description is required');

        else if (value.length > 0 && value.length >25)
            return getErrorObject(true, 'Skill Description should be 25 characters');
        return null;
    }
