import { Component } from "react";

class AlbumItem extends Component {

    render(){
        const { album } = this.props;
        return (
            <tr>
                <td>{album.name}</td>
                <td>{album.release_date}</td>
                <td>{album.popularity}</td>
            </tr>
        )
    }
  

}

export default AlbumItem;
