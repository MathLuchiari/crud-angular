import { Injectable } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  validadeAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach( field => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({onlySelf: true});
        this.validadeAllFormFields(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup,fieldName: string): string {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl): string {
    if( field?.hasError('required') ) {
      return 'Campo obrigatório!';
    }

    if( field?.hasError('minlength') ) {
      const requiredMinLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredMinLength} caracteres!`;
    }

    if( field?.hasError('maxlength') ) {
      const requiredMaxLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredMaxLength} caracteres!`;
    }

    return 'Campo inválido!'
  }

  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string): boolean {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }

  msgSnackBar( message: string ) {
    this._snackBar.open(message, '', { duration: 5000});
  }
}
