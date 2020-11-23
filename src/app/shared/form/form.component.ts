import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from '../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './custom-validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  private _isUpdateMode: boolean;
  private _model: User;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<User>;
  private readonly _form: FormGroup;

  constructor() {
    this._submit$ = new EventEmitter<User>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  @Input()
  set model(model: User) {
    this._model = model;
  }

  get model(): User {
    return this._model;
  }

  get form(): FormGroup {
    return this._form;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<User> {
    return this._submit$;
  }

  ngOnInit(): void {
  }

  ngOnChanges(record): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        firstname: '',
        lastname: '',
        mail: '',
        phone: '',
        age: 0,
        fullName: ''
      };
      this._isUpdateMode = false;
    }

    this._form.patchValue(this._model);
  }

  cancel(): void {
    this._cancel$.emit();
  }

  submit(user: User): void {
    this._submit$.emit(user);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      photo: new FormControl(),
      firstname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      mail: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.email
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('(\\+33)\\d{9}')
      ])),
      age: new FormControl(18, Validators.min(18))
    });
  }

}
