import { Injectable } from '@angular/core';






/**
 * 英文佳句 對應API
 * @export
 * @class C_QUOTE
 */
export class C_QUOTE {

    _id: string = '';
    /**
     * 佳句內容
     * @type {string}
     * @memberof C_QUOTE
     */
    _content: string = '';
    /**
     * 佳句作者
     * @type {string}
     * @memberof C_QUOTE
     */
    _author: string = '';
    /**
     * 佳句標籤
     * @type {string[]}
     * @memberof C_QUOTE
     */
    _tags: string[] = [];
    _authorSlug: string = '';
    /**
     * 佳句字元長度
     * @type {number}
     * @memberof C_QUOTE
     */
    _length: number = 0;
    _dateAdded: string = '';
    _dateModified: string = '';

    constructor() { }


    public static haveValue(id: string,
        content: string,
        author: string,
        tags: string[],
        authorslug: string,
        length: number,
        dateadded: string,
        datemodified: string): C_QUOTE {

        const cls = new C_QUOTE();
        cls._id = id;
        cls._content = content;
        cls._author = author;
        cls._tags = tags;
        cls._authorSlug = authorslug;
        cls._length = length;
        cls._dateAdded = dateadded;
        cls._dateModified = datemodified;
        return cls;
    }

    // constructor(
    //     id: string,
    //     content: string,
    //     author: string,
    //     tags: string[],
    //     authorslug: string,
    //     length: number,
    //     dateadded: string,
    //     datemodified: string
    // ) {
    //     this._id = id;
    //     this._content = content;
    //     this._author = author;
    //     this._tags = tags;
    //     this._authorSlug = authorslug;
    //     this._length = length;
    //     this._dateAdded = dateadded;
    //     this._dateModified = datemodified;
    // }

}


@Injectable({
    providedIn: 'root',
})

export class DataAdapter {

    adpater(classType: any, item: any) {

        let ret: any;
        switch (classType) {
            case C_QUOTE:
                ret = C_QUOTE.haveValue(item._id, item.content, item.author, item.tags, item.authorSlug, item.length, item.dateAdded, item.dateModified);
                break;

            default:
                break;
        }
        return ret;
    }


}