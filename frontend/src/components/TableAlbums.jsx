import { Component } from "react";
import AlbumItem from "./AlbumItem";

class TableAlbums extends Component {

    render(){
        const { albums } = this.props;

        return albums.length > 0 ? ( 
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre Album</th>
                        <th>Fecha de lanzamiento</th>
                        <th>Popularidad</th>
                    </tr>
                </thead>
                <tbody>
                    { albums.map((album, i) => <AlbumItem album={album} key={i} />) }
                </tbody>
            </table>
            ) : (
            <div>
                <p>No hay artistas encontrados con la busqueda actual.</p>
            </div>
            )
    }
  

}

export default TableAlbums;
