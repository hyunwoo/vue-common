import Datable from './baseDatableStorage';


interface ArrayTest {
  a: string;
  b: number;
}

interface ObjectTest {
  x: string;
  y: number;
}

export default class DatableStorageTestModel extends Datable {
  public name: string = '';
  public arrayTest: ArrayTest[] = [];
  public objectTest: ObjectTest = { x: '0', y: 10 };

  public constructor(location: string) {
    super(location);
    // Array Override Test
    this.name = 'helloworld';
  }

  public get getterTest() {
    return '[' + this.name + ']' + this.objectTest.x + ', ' + this.objectTest.y;
  }

  public functionTest(name: string) {
    this.name = 'name';
    this.arrayTest.push({ a: name, b: this.arrayTest.length });
    this.objectTest.x = name;
    this.objectTest.y = this.arrayTest.length;
  }

}
