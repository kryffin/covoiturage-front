import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ride} from '../interfaces/ride';
import {CustomValidators} from './custom-validators';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-form-ride',
  templateUrl: './form-ride.component.html',
  styleUrls: ['./form-ride.component.css']
})
export class FormRideComponent implements OnInit, OnChanges {

  private _isUpdateMode: boolean;
  private _model: Ride;
  private _users: User[];
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Ride>;
  private readonly _form: FormGroup;
  private readonly _formStart: FormGroup;
  private readonly _formFinish: FormGroup;

  constructor(private _userService: UserService) {
    this._submit$ = new EventEmitter<Ride>();
    this._cancel$ = new EventEmitter<void>();
    this._formStart = this._buildAddressForm();
    this._formFinish = this._buildAddressForm();
    this._form = this._buildForm();
    this._users = [];
  }

  @Input()
  set model(model: Ride) {
    this._model = model;
  }

  get model(): Ride {
    return this._model;
  }

  get users(): User[] {
    return this._users;
  }

  get form(): FormGroup {
    return this._form;
  }

  get formStart(): FormGroup {
    return this._formStart;
  }

  get formFinish(): FormGroup {
    return this._formFinish;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Ride> {
    return this._submit$;
  }

  counter(nb: number) {
    return Array(nb);
  }

  ngOnInit(): void {
    this._userService
      .fetch().subscribe((users: User[]) => this._users = users);
  }

  ngOnChanges(record): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        driver: '',
        start: {
          street: '',
          postalCode: '',
          city: ''
        },
        finish: {
          street: '',
          postalCode: '',
          city: ''
        },
        duration: 0,
        price: .0,
        date: '01/01/2000'
      };
      this._isUpdateMode = false;
    }

    this._form.patchValue(this._model);
  }

  cancel(): void {
    this._cancel$.emit();
  }

  submit(ride: Ride): void {
    if (ride.client == '') delete ride.client;
    this._submit$.emit(ride);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      driver: new FormControl(''),
      client: new FormControl(''),
      start: this._formStart,
      finish: this._formFinish,
      duration: new FormControl(0, Validators.min(0)),
      price: new FormControl(0, Validators.min(0)),
      date: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.date
      ]))
    });
  }

  private _buildAddressForm(): FormGroup {
    return new FormGroup({
      street: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      postalCode: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }
}
