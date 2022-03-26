type RecordItem = {
    id: string
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型 object | string
    createdAt?: Date  // 类 / 构造函数
}

type Tag = {
    id: string;
    name: string;
}

type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag,
    currentRecord?:RecordItem,
    createRecordError: Error | null,
    createTagError: Error | null,
}