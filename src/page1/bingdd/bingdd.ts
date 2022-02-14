import * as THREE from 'three';

function drownLine() {
    var shape = new THREE.Shape();//创建Shape对象
    var points = [//定位定点
        new THREE.Vector2(100, 400, 0),
        new THREE.Vector2(-200, 300, 0),
        new THREE.Vector2(50, 50, 0)
    ];
    shape.splineThru(points);//顶点带入样条插值计算函数
    var splinePoints = shape.getPoints(50);//插值计算细分数20
    var geometry = new THREE.LatheGeometry(splinePoints, 100);//旋转造型
    const material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(0, 100, 0);
    return mesh;
}

function drawBody() {
    const geometry = new THREE.SphereGeometry(150, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2); //创建一个立方体几何对象Geometry
    geometry.scale(1, 1.5, 0.8);
    //geometry.rotateY(Math.PI/4);
    // const material = new THREE.MeshLambertMaterial({
    //     color: 0xeeeeff
    // }); //材质对象Material
    var textureLoader = new THREE.TextureLoader();
    // 加载颜色纹理贴图
    var texture = textureLoader.load('../yuan.png');
    // 加载凹凸贴图
    var textureBump = textureLoader.load('../yuan.png');
    var material = new THREE.MeshPhongMaterial({
        color: 0xeeeeff,
        //map: texture,// 普通纹理贴图
        //bumpMap:textureBump,//凹凸贴图
        bumpScale:2,//设置凹凸高度，默认值1。
    }); 

    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(0, 100, 0);

    return mesh;
}

function drawEyeY() {
    const geometry = new THREE.SphereGeometry(40, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2); //创建一个立方体几何对象Geometry
    geometry.scale(1, 1.5, 0.3);
    geometry.rotateZ(Math.PI /12);
    geometry.rotateX(-Math.PI / 14);
    geometry.rotateY(Math.PI / 4);
    const material = new THREE.MeshLambertMaterial({
        color: 0x000000
    }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(95, 180, 76);

    let group = new THREE.Group();
    group.add(mesh);
    const geometryZhu = new THREE.TorusGeometry(18, 2, 50, 100);
    const materialZhu = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    geometryZhu.scale(1, 1, 0.5);
    geometryZhu.rotateX(-Math.PI / 16);
    geometryZhu.rotateY(Math.PI / 5);
    const meshZhu = new THREE.Mesh(geometryZhu, materialZhu); //网格模型对象Mesh
    meshZhu.position.set(90, 195, 92);
    group.add(meshZhu);

    return group;
}

function drawBizi(){
    const geometry = new THREE.SphereGeometry(30, 30, 30); //创建一个立方体几何对象Geometry
    geometry.scale(1, 0.5, 1);
    const material = new THREE.MeshLambertMaterial({
        color: 0x000000
    }); //材质对象Material

    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(35, 120, 100);

    return mesh;
}

function drawEr(){
    const geometry = new THREE.SphereGeometry(40, 30, 30); //创建一个立方体几何对象Geometry
    geometry.scale(1, 1.2, 1);
    const material = new THREE.MeshLambertMaterial({
        color: 0x000000
    }); //材质对象Material

    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(-60,310, 0);

    let group = new THREE.Group();
    const meshY=mesh.clone();
    meshY.position.set(60,310, -5);
    group.add(mesh);
    group.add(meshY);
    return group;
}

function drawTui(){
    const geometry = new THREE.CylinderGeometry(30, 30, 120,32); //创建一个立方体几何对象Geometry
    //geometry.scale(1, 1.2, 1);
    const material = new THREE.MeshLambertMaterial({
        color: 0x000000
    }); //材质对象Material

    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(-40,-110, 5);

    let group = new THREE.Group();
    const meshY=mesh.clone();
    meshY.position.set(40,-110, 5);
    group.add(mesh);
    group.add(meshY);
    return group;
}

function ddd(){
    var shape = new THREE.Shape();//创建Shape对象
    var points = [//定位定点
        new THREE.Vector2(-40,80),
        new THREE.Vector2(-30,50),
        new THREE.Vector2(-30,-80),
        //new THREE.Vector2(30,90)
    ];
    shape.splineThru(points);//顶点带入样条插值计算函数
    var splinePoints = shape.getPoints(20);//插值计算细分数20
    var geometry = new THREE.LatheGeometry(splinePoints,30);//旋转造型
    const material = new THREE.MeshLambertMaterial({
        color: 0x000000,
        side:THREE.DoubleSide//两面可见
    });
    geometry.rotateZ(Math.PI/2);
    geometry.rotateY(Math.PI/3);
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(-110,100, 65);
    let group = new THREE.Group();
    const meshY=mesh.clone();
    meshY.position.set(110,120, -70);
    meshY.rotateZ(Math.PI*3);
    meshY.rotateX(Math.PI/2);
    meshY.rotateY(-Math.PI/8);
    group.add(mesh);
    group.add(meshY);
    return group;
}

function drawZui(){
    const geometry =new THREE.TorusGeometry(22, 10, 50, 100);
    geometry.scale(1, 0.4, 1);
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    }); //材质对象Material
    geometry.rotateY(Math.PI / 18);
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(35, 80, 108);
    let group = new THREE.Group();
    group.add(mesh);
    return group;
}
function drawEyeZ() {
    const geometry = new THREE.SphereGeometry(40, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2); //创建一个立方体几何对象Geometry
    geometry.scale(1, 1.5, 0.3);
    geometry.rotateZ(-Math.PI /6);
    geometry.rotateX(-Math.PI / 18);
    geometry.rotateY(-Math.PI / 15);
    const material = new THREE.MeshLambertMaterial({
        color: 0x000000
    }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(-30, 180, 105);

    let group = new THREE.Group();
    group.add(mesh);
    const geometryZhu = new THREE.TorusGeometry(18, 2, 50, 100);
    const materialZhu = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    geometryZhu.scale(1, 1, 0.5);
    geometryZhu.rotateZ(-Math.PI / 8);
    geometryZhu.rotateX(-Math.PI / 16);
    geometryZhu.rotateY(-Math.PI / 24);
    const meshZhu = new THREE.Mesh(geometryZhu, materialZhu); //网格模型对象Mesh
    meshZhu.position.set(-16, 193, 116);
    group.add(meshZhu);

    return group;
}
export default class BindDD {

    name: string;
    group: any;
    constructor(name: string) {
        this.name = name;
        this.group = new THREE.Group();

        this.group.add(drawBody());
        this.group.add(drawBizi());
        this.group.add(drawZui());
        //let ayeZ = drawEyeZ();
        //let eyeY=ayeZ.clone();
        this.group.add(drawEyeZ());
        this.group.add(drawEyeY());
        this.group.add(drawEr());
        this.group.add(drawTui());
        this.group.add(ddd());
        //eyeY.position.set(80, 200,0); 
        //this.group.add(eyeY);
        //this.group.add(drownLine()); 

        this.group.position.set(0, 60,0); 
    }
    instance() {
        return this.group;
    }
}