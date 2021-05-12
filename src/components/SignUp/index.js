/* eslint-disable */
import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Card, Form, ListGroup } from 'react-bootstrap';
import Select from 'react-select';



import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const options = [
  { value: 1, label: 'Administrador'},
  { value: 2, label: 'Instructor' },
  { value: 3, label: 'Responsable/General' },
  { value: 4, label: 'Padre/Tutor' },
  { value: 5, label: 'Alumno' },
];
const generoOptions = [
  { value: "masculino", label: 'Masculino '},
  { value: "Femenino", label: 'Femenino' },
];
 
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm/>
  </div>
);

const INITIAL_STATE = {
  nombre: '',
  apellidos: '',
  genero: '',
  fechaNacimiento: '',
  email: '',
  calle: '',
  numExterior: '',
  numInterior: '',
  colonia: '',
  cp: 0,
  municipio: '',
  estado: '',
  contacto_emergencia: '',
  personas_autorizadas: '',
  telefono:'',
  passwordOne: '',
  passwordTwo: '',
  role: 0,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props); 

    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { nombre, apellidos, genero, fechaNacimiento, email, calle, numExterior, numInterior, colonia, cp, municipio, estado, contacto_emergencia, telefonoEmergencia, personas_autorizadas, telefono, passwordOne, passwordTwo, role, a } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        if( role === 1){
          //const roleRef = this.props.firebase.addRole('administracion',authUser.user.uid)
          return this.props.firebase
          .user(authUser.user.uid)
          .set({
            nombre,
            apellidos,
            telefono,
            email,
            role,
            date: new Date().toString()
          });
        } else if(role === 2){
          return this.props.firebase
          .user(authUser.user.uid)
          .set({
            nombre,
            apellidos,
            telefono,
            fechaNacimiento,
            email,
            role,
            date: new Date().toString()
          });
        } else if(role === 3){
          return this.props.firebase
          .user(authUser.user.uid)
          .set({
            nombre,
            apellidos,
            telefono,
            email,
            role,
            date: new Date().toISOString()
          });
        } else if(role === 4){
          return this.props.firebase
          .user(authUser.user.uid)
          .set({
            nombre,
            apellidos,
            telefono,
            email,
            role,
            date: new Date().toISOString()
          });
        } else if(role === 5){
          return this.props.firebase
          .user(authUser.user.uid)
          .set({
            nombre,
            apellidos,
            telefono,
            email,
            genero,
            direccion: {
                calle,
                numExterior,
                numInterior,
                colonia,
                cp,
                municipio,
                estado
            },
            datosMedicos: {
              contacto_emergencia,
              telefonoEmergencia
            },
            role,
            date: new Date().toString()
          });
        } 
        
      })
      .then(() => {
        
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  handleChange = role => {
    this.setState({ role: role.value });
    console.log(`Option selected:`, role.value);
  };

  handleChangeGenero = genero => {
    this.setState({ genero: genero.value });
    console.log(`Option selected:`, genero.value);
  };

  render() {
    const {
      nombre,
      apellidos,
      genero,
      fechaNacimiento,
      email,
      calle,
      numExterior,
      numInterior,
      colonia,
      cp,
      municipio,
      estado,
      contacto_emergencia,
      telefonoEmergencia,
      personas_autorizadas,
      telefono,
      passwordOne,
      passwordTwo,
      role,
      error
    } = this.state;
    

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      nombre === '';


    return (
      
      //Nombre
      
      <Form onSubmit={this.onSubmit} >

        <Select
          value = {role}
          onChange = {this.handleChange}
          options = {options} />
          
          
          {/* ###### Administrador ###### */}
        
          { role === 1 ? 
            <div>
              <Form.Label><h1>Administrador</h1></Form.Label>
              {/* Nombre */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Nombre(s)</Form.Label>
                  <Form.Control type="name" 
                    placeholder="Nombre(s)" 
                    name="nombre"
                    value={nombre}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Apellidos */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Apellidos</Form.Label>
                  <Form.Control type="apellidos" 
                    placeholder="Apellidos" 
                    name="apellidos"
                    value={apellidos}
                    onChange={this.onChange} />
              </Form.Group>
              
              {/* Telefono */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    placeholder="Telefono:" 
                    name="telefono"
                    value={telefono}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Correo */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Email:" 
                    name="email"
                    input="email"
                    value={email}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Contraseña */}
              <Form.Group controlId="passwordOne">
                <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    placeholder="******" 
                    name="passwordOne"
                    type="password"
                    value={passwordOne}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Confimar Contraseña */}
              <Form.Group controlId="passwordTwo">
                <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    placeholder="******" 
                    name="passwordTwo"
                    type="password"
                    value={passwordTwo}
                    onChange={this.onChange} />
              </Form.Group>
            </div>
          : null }


          {/* ###### Instructor ###### */}
          { role === 2 ?
            <div>
              <Form.Label><h1>Instructor</h1></Form.Label>
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Nombre(s)</Form.Label>
                  <Form.Control type="name" 
                    placeholder="Nombre(s)" 
                    name="nombre"
                    value={nombre}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Apellidos */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="apellidos" 
                  placeholder="Apellidos" 
                  name="apellidos"
                  value={apellidos}
                  onChange={this.onChange} />
              </Form.Group>
              
              {/* Telefono */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  placeholder="Telefono:" 
                  name="telefono"
                  value={telefono}
                  onChange={this.onChange} />
              </Form.Group>

              {/* Fecha Nacimiento */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={this.onChange} />
              </Form.Group>


              {/* Correo */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Email:" 
                    name="email"
                    input="email"
                    value={email}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Contraseña */}
              <Form.Group controlId="passwordOne">
                <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    placeholder="******" 
                    name="passwordOne"
                    type="password"
                    value={passwordOne}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Confimar Contraseña */}
              <Form.Group controlId="passwordTwo">
                <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    placeholder="******" 
                    name="passwordTwo"
                    type="password"
                    value={passwordTwo}
                    onChange={this.onChange} />
              </Form.Group>
            </div>
          : null }

          {/* ###### Responsable ###### */}
          { role === 3 ?
            <div>
              <Form.Label><h1>Responsable (en General)</h1></Form.Label>
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control type="name" 
                  placeholder="Nombre(s)" 
                  name="nombre"
                  value={nombre}
                  onChange={this.onChange} />
              </Form.Group>
              
              {/* Apellidos */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="apellidos" 
                  placeholder="Apellidos" 
                  name="apellidos"
                  value={apellidos}
                  onChange={this.onChange} />
              </Form.Group>

              {/* Telefono */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  placeholder="Telefono:" 
                  name="telefono"
                  value={telefono}
                  onChange={this.onChange} />
              </Form.Group>

              {/* Correo */}
            <Form.Group controlId="formBasicBussiness">
              <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email:" 
                  name="email"
                  input="email"
                  value={email}
                  onChange={this.onChange} />
            </Form.Group>

            {/* Contraseña */}
            <Form.Group controlId="passwordOne">
              <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  placeholder="******" 
                  name="passwordOne"
                  type="password"
                  value={passwordOne}
                  onChange={this.onChange} />
            </Form.Group>

            {/* Confimar Contraseña */}
            <Form.Group controlId="passwordTwo">
              <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  placeholder="******" 
                  name="passwordTwo"
                  type="password"
                  value={passwordTwo}
                  onChange={this.onChange} />
            </Form.Group>
            </div>
          : null }


          {/* ###### Padre/Tutor ###### */}
          { role === 4 ?
            <div>
              <Form.Label><h1>Padre/Tutor</h1></Form.Label>
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control type="name" 
                  placeholder="Nombre(s)" 
                  name="nombre"
                  value={nombre}
                  onChange={this.onChange} />
              </Form.Group>
              
              {/* Apellidos */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="apellidos" 
                  placeholder="Apellidos" 
                  name="apellidos"
                  value={apellidos}
                  onChange={this.onChange} />
              </Form.Group>

              {/* Telefono */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  placeholder="Telefono:" 
                  name="telefono"
                  value={telefono}
                  onChange={this.onChange} />
              </Form.Group>

              {/* Correo */}
            <Form.Group controlId="formBasicBussiness">
              <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email:" 
                  name="email"
                  input="email"
                  value={email}
                  onChange={this.onChange} />
            </Form.Group>

            {/* Contraseña */}
            <Form.Group controlId="passwordOne">
              <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  placeholder="******" 
                  name="passwordOne"
                  type="password"
                  value={passwordOne}
                  onChange={this.onChange} />
            </Form.Group>

            {/* Confimar Contraseña */}
            <Form.Group controlId="passwordTwo">
              <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  placeholder="******" 
                  name="passwordTwo"
                  type="password"
                  value={passwordTwo}
                  onChange={this.onChange} />
            </Form.Group>

            </div>
          : null }


          {/* ###### Alumno ###### */}
          { role === 5 ?
            <div>
              <Form.Label><h1>Alumno</h1></Form.Label>
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control type="name" 
                  placeholder="Nombre(s)" 
                  name="nombre"
                  value={nombre}
                  onChange={this.onChange} />
              </Form.Group>
              
              {/* Apellidos */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="apellidos" 
                  placeholder="Apellidos" 
                  name="apellidos"
                  value={apellidos}
                  onChange={this.onChange} />
              </Form.Group>

              {/* Telefono */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  placeholder="Telefono:" 
                  name="telefono"
                  value={telefono}
                  onChange={this.onChange} />
              </Form.Group>

              {/* Correo */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Email:" 
                    name="email"
                    input="email"
                    value={email}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Contraseña */}
              <Form.Group controlId="passwordOne">
                <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    placeholder="******" 
                    name="passwordOne"
                    type="password"
                    value={passwordOne}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Confimar Contraseña */}
              <Form.Group controlId="passwordTwo">
                <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    placeholder="******" 
                    name="passwordTwo"
                    type="password"
                    value={passwordTwo}
                    onChange={this.onChange} />
              </Form.Group>

              {/* Genero */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Genero</Form.Label>
                <Select
                  value = {genero}
                  onChange = {this.handleChangeGenero}
                  options = {generoOptions} />
              </Form.Group>

              {/* Fecha Nacimiento */}
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={this.onChange} />
              </Form.Group>

              <Form.Label><h1>Direccion</h1></Form.Label>
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Calle</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Calle" 
                    name="calle"
                    value={calle}
                    onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Numero Interior</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Numero Interior" 
                    name="numInterior"
                    value={numInterior}
                    onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Numero Exterior</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Numero Exterior" 
                    name="numExterior"
                    value={numExterior}
                    onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Colonia</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Colonia" 
                    name="colonia"
                    value={colonia}
                    onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Municipio</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Municipio" 
                    name="municipio"
                    value={municipio}
                    onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Estado</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Estado" 
                    name="estado"
                    value={estado}
                    onChange={this.onChange} />
              </Form.Group>

              <Form.Label><h1>Datos Médicos</h1></Form.Label>
              <Form.Group controlId="formBasicBussiness">
                <Form.Label>Contacto de emergencia</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Nombre" 
                    name="contacto_emergencia"
                    value={contacto_emergencia}
                    onChange={this.onChange} />

                <Form.Control type="text" 
                    placeholder="Telefono de Emergencia" 
                    name="telefonoEmergencia"
                    value={telefonoEmergencia}
                    onChange={this.onChange} />
              </Form.Group>
            </div>
          : null }
        
        
        <button disabled={isInvalid} type="submit">Sign Up</button>
 
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
 
export { SignUpForm, SignUpLink };