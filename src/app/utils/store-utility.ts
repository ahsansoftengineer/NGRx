export class StoreUtility {
  // [{id,...}, {id,...}] -> nomal array
  static normalize(entityArray: Entity[]) {
    return entityArray.reduce((previousValue, currentValue) => {
      return {...previousValue, ...{[currentValue.id]: currentValue}}
    })
  }
    // entities: {id: {}} -> normalized format
  // [{1: {}},{2: {}}, ...]
  static unNormalized(entities: {[id: number]: any}){
    if(!entities){
      return []
    }else {
      return Object.keys(entities).map(key => entities[key])
    }
  }
  // [1,2,3,4,5,1]
  static filterDuplicate(ids:number[]){
    return ids.filter ((elem, index, self) => index === self.indexOf(elem))
  }
  // Delete Entity
  static removeKey(entities:{ [id: number]: any}, id: any){
    const newObj = {...entities }
    delete newObj[id]
    return newObj;
  }
}
interface Entity {
  id: any;
}

// const array = [1,2,3,4]
// const result = array.reduce((previousValue, currentValue) => {
//   return previousValue + currentValue
// }, 10)
// console.log('result = '+ 20);
