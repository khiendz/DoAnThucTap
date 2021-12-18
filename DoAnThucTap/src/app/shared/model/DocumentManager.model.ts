export class Contract {
    public  Id:string;
    public  Name:string;
    public  Size:string;
    public  Path:string;

    constructor(Id:string, Name:string, Size:string, Path:string)
    {
        this.Id  = Id;
        this.Name = Name;
        this.Size = Size;
        this.Path = Path;
    }
    
}
