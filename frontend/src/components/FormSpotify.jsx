import { Component } from "react";
import axios from 'axios';
import TableAlbums from "./TableAlbums";

class FormSpotify extends Component {

  state = {
    albumList: [],
    token: "",
    loading: false
  }

  componentDidMount(){
    const { token } = this.state;

    

    if(token === ""){
      const code = new URLSearchParams(this.props.location.search).get("code");
      axios.post('http://localhost:3000/api/auth/login', { code })
        .then(response => this.setState({...this.state, token: response.data.access_token }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({...this.state, loading: true });
    const artistName = event.target.artistName.value;
    const { token } = this.state;

    axios.post('http://localhost:3000/api/albums/search', { artistName , token })
        .then(response => this.setState({...this.state, albumList: response.data, loading: false }));
  };

  authenticate = () => {
    window.location.href = "http://localhost:3000/api/auth";
  };

  render(){
    const { token, albumList, loading } = this.state;

    return token !== "" ? ( 
        <div>
          <form onSubmit={this.handleSubmit}>
              <label>
              Nombre del artista:
              <input type="text" name="artistName" />
              </label>
              <button type="submit" disabled={loading}>Consultar</button>
          </form>
          <TableAlbums albums={albumList} />
        </div>
        ) : (
          <div>
            <p>Es necesario que inicies sesion en Spotify</p>
            <button type="button" onClick={this.authenticate}>Iniciar sesion ahora</button>
          </div>
        )
  }
  

}

export default FormSpotify;
