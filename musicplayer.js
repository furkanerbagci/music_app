class MusicPlayer{
    constructor(musicList){
        this.musicList = musicList;
        this.index = 0;
    }

    getMusic(){
        return this.musicList[this.index];
    }

    next(){
        if(this.index + 1  < this.musicList.length ){
            this.index ++
        }else{
            this.index=0;
        }
    }

    prev(){
        if(this.index != 0){
            this.index--
        }else if(this.index==0){
            this.index = this.MusicList.length-1;
        }
    }
}   
