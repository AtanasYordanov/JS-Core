const assert = require('chai').assert;
const SoftUniFy = require('./SoftUnify');

describe('SoftUniFy', function () {
    let softunify;

    beforeEach(() => {
        softunify = new SoftUniFy();
    });

    it('downloadSong, valid data, should add song', function () {
        softunify.downloadSong('Gosho', 'song', 'some lyrics');
        assert.equal(softunify.allSongs['Gosho']['songs'].length, 1);
    });

    it('downloadSong, should return class instance', function () {
        assert.equal(softunify.downloadSong('Gosho', 'song', 'some lyrics'), softunify);
    });

    it('playSong, when no songs, should return correct message', function () {
        let result = softunify.playSong('song');
        assert.equal(result, 'You have not downloaded a song song yet. Use SoftUniFy\'s function downloadSong() to change that!');
    });

    it('playSong, when a song is present, should return correct result', function () {
        softunify.downloadSong('Gosho', 'song', 'some lyrics');
        let result = softunify.playSong('song');
        assert.equal(result, 'Gosho:\nsong - some lyrics\n');
    });

    it('playSong, when a song is present, should return correct result', function () {
        softunify.downloadSong('Gosho', 'song', 'some lyrics');
        softunify.downloadSong('Gosho2', 'song', 'some lyrics2');
        let result = softunify.playSong('song');
        assert.equal(result, 'Gosho:\nsong - some lyrics\nGosho2:\nsong - some lyrics2\n');
    });

    it('songsList, no songs, should return correct message', function () {
        assert.equal(softunify.songsList, 'Your song list is empty');
    });

    it('songsList, when songs are present, should return correct message', function () {
        softunify.downloadSong('Gosho', 'song', 'some lyrics');
        softunify.downloadSong('Gosho2', 'song', 'some lyrics2');
        assert.equal(softunify.songsList, 'song - some lyrics\nsong - some lyrics2');
    });

    it('rateArtist, non-existent artist, should return correct message', function () {
        assert.equal(softunify.rateArtist('osho'), 'The Gosho is not on your artist list.');
    });

    it('rateArtist, first vote, should return correct value', function () {
        softunify.downloadSong('Gosho', 'song', 'some lyrics');
        softunify.downloadSong('Gosho2', 'song', 'some lyrics2');
        assert.equal(softunify.rateArtist('Gosho', 50), 50);
    });

    it('rateArtist, more votes, should return correct value', function () {
        softunify.downloadSong('Gosho', 'song', 'some lyrics');
        softunify.downloadSong('Gosho2', 'song', 'some lyrics2');
        softunify.rateArtist('Gosho', 25);
        assert.equal(softunify.rateArtist('Gosho', 50), 37.5);
    });
});