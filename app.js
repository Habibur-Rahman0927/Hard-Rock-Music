const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value="";
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError("Something Went Wrong!! Please try again later..."));
}

const displaySongs = songs =>{
    const songContainer = document.getElementById('song-container');
    songContainer.innerText = '';
    songs.forEach(song => {
        const songsDiv = document.createElement('div');
        songsDiv.className='single-result row align-itens-center my-3 p-3'
        songsDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songsDiv);
    });
}

const getLyric = (artist, title) =>{
    console.log(artist, title)
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError("Something Went Wrong!! Please try again later..."));
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}