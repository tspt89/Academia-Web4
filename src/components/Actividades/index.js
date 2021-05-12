import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import { withAuthorization} from '../Session';
import { db } from '../Firebase/firebase.js';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { Button, Table, Card, Form } from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 1, label: 'Administrador'},
  { value: 2, label: 'Instructor' },
  { value: 3, label: 'Responsable/General' },
  { value: 4, label: 'Padre/Tutor' },
  { value: 5, label: 'Alumno' },
];
 
class ActivityForm extends Component {
  constructor(props) {
    super(props);
    console.log("Usuario",db.authUser)
    this.state = {
      loading: false,
      users: [],
      uid: '',
      apellidos: '',
      fechaNacimiento: '',
      email:'',
      telefono: ''
    };

    this.onDelete = this.onDelete.bind(this);
    
  }
 
  componentDidMount() {
    this.setState({ loading: true });
 
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      console.log("Prueba" , usersObject)
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      console.log("UserList" , usersObject)
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onSubmitUser = (event) => {
    const {
      uid,
      nombre,
      apellidos,
      telefono,
      role,
    } = this.state;
    console.log(uid);
    if (uid !== "") {
      db.child(`users/${uid}`).set(
        {
          nombre,
          apellidos,
          telefono,
          role
        },
        (err) => {
          if (err) console.log(err);
        }
      );
    }
  };

  onDelete = key =>{
    if (window.confirm("Are you sure?")) {
      db.child(`users/${key}`).remove((err) => {
        if (err) console.log(err);
      });
    }
  };
 
  onChange = (event) => {
    console.log(this.props.follower);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { users, loading, uid, adminVisibility, nombre, apellidos, fechaNacimiento, email, error, telefono, role } = this.state;

    return (
      <div>
        <h1>Crear nueva actividad</h1>
        <Button variant="secondary" href={ROUTES.SIGN_IN}>
          Crear Actividad
        </Button>

        {loading && <div>Loading ...</div>}

        {/* ADMINISTRADORES */}
        <h1> Administradores</h1>
        <div className="container-fluid">
          <Table striped>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>fecha</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.nombre}</td>
                  <td>{user.apellidos}</td>
                  <td>{user.email}</td>
                  <td>{user.date}</td>
                  <td>{user.telefono}</td>
                  <td>{user.role === 1 ? 'Administrador': ""}</td>
                  <td>
                    <Button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {this.onDelete(user.uid)}}>
                      Delete
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => {
                        this.setState({ uid: user.uid });
                        this.setState({ nombre: user.nombre });
                        this.setState({ apellidos: user.apellidos });
                        this.setState({ telefono: user.telefono });
                        this.setState({ adminVisibility: (this.state.adminVisibility !== 0 ) ? 0 : -1});
                      }}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        <div
          style={
            this.state.adminVisibility == 0
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <Card>
            <h2 className="text-center text-full">Editar usuario</h2>
            <h5 className="text-muted text-center">
              Fill in the form below to edit an account.
            </h5>
            <Card.Body>
              <Form onSubmit={this.onSubmitUser} className="log-form">
                <Form.Group controlId="formBasicBussiness">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="nombre"
                    placeholder="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicContact">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="apellidos"
                    placeholder="Apellido Paterno y Materno"
                    name="apellidos"
                    value={apellidos}
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicRFC">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="telefono"
                    placeholder="Telefono"
                    name="telefono"
                    value={telefono}
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicWA">
                  <Form.Label>Rol</Form.Label>
                  <Select
                    value = {role}
                    onChange = {this.handleChange}
                    options = {options} />

                </Form.Group>
                
                <Card.Footer>
                  <Button type="submit" variant="primary" size="lg" block>
                    Editar usuario
                  </Button>
                  {error && <p>{error.message}</p>}
                </Card.Footer>
              </Form>
            </Card.Body>
          </Card>
        </div>
        
        
        
      </div>

      
    );
  }
}



const condition = authUser => authUser && authUser.role === 1 && authUser;

export default compose(withAuthorization(condition),withFirebase)(ActivityForm);