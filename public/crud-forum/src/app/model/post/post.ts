
export class Post{
  constructor(public _id : string, public userId : string, public timestamp: string, public comment : string){}
}

export type ShearedPost = Omit<Post, '_id'>;
