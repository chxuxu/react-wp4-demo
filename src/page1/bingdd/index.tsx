import React, { FC, useState, useEffect, useRef } from 'react';

import * as THREE from 'three';
//var THREE = require('three');
//import {OrbitControls} from "three/examples/js/controls/OrbitControls";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import BindDD from "./bingdd";
import "./index.less";
export interface IBingDDProps {
}

export default function BingDD(props: IBingDDProps) {

  const refDiv = useRef(null);
  console.log(THREE);
  useEffect(() => {
    if (refDiv && refDiv.current) {
      const width = 1000;//window.innerWidth; //窗口宽度
      const height = 1200;// window.innerHeight; //窗口高度
      const k = width / height; //窗口宽高比
      const s = 400; //三维场景显示范围控制系数，系数越大，显示的范围越大
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      camera.position.set(300, 200, 300); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      console.log(scene.position, 111);
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      refDiv.current.appendChild(renderer.domElement); //body元素中插入canvas对象
      const helper = new THREE.CameraHelper(camera);
      //scene.add( helper );
      //环境光
      const ambient = new THREE.AmbientLight(0x444444);
      scene.add(ambient);

      //点光源
      const point = new THREE.PointLight(0xffffff);
      point.position.set(300, 200, 400); //点光源位置
      scene.add(point); //点光源添加到场景中
      const pointLightHelper = new THREE.PointLightHelper(point, 2, 0xff0000);
      scene.add(pointLightHelper);

      const geometryDiMian = new THREE.PlaneGeometry(1800, 500, 20);
      const materialDIMian = new THREE.MeshBasicMaterial({ color: 0x009900, side: THREE.DoubleSide });
      const meshDimian = new THREE.Mesh(geometryDiMian, materialDIMian);
      geometryDiMian.rotateX(Math.PI / 2);
      //geometryDiMian.rotateY(Math.PI / 4);
      meshDimian.position.set(600, -100, 100);
      scene.add(meshDimian);

      //////////////////////////////////////
      //创建网格模型
      //var geometry = new THREE.SphereGeometry(10,10, 10); //创建一个球体几何对象
      const geometry = new THREE.BoxGeometry(500, 500, 2); //创建一个立方体几何对象Geometry
      const material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      }); //材质对象Material
      const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.position.set(0, 0, 0);
      //geometry.scale(0.2,0.2,0.2);
      //scene.add(mesh); //网格模型添加到场景中


      const dingddObj = new BindDD("bdd");
      let bingdd = dingddObj.instance();
      scene.add(bingdd);


      /////////////////////////////////////
      //执行渲染操作   指定场景、相机作为参数
      //renderer.render(scene, camera);

      let render = function () {
        renderer.render(scene, camera);//执行渲染操作
        //bingdd.rotateY(0.01);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(render);//请求再次执行渲染函数render
      }
     
      //var controls = new OrbitControls(camera, renderer.domElement);//创建控件对象
      // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数
      // controls.addEventListener('change', render)

      /**
 * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
 */
      // 创建名为Box对象的关键帧数据
      var times = [0, 10]; //关键帧时间数组，离散的时间点序列
      var values = [0, 0, -1000, 0, 0, 0]; //与时间点对应的值组成的数组
      // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
      var posTrack = new THREE.KeyframeTrack('Box.position', times, values);
      // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
      //var colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
      // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
      //var scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);

      // duration决定了默认的播放时间，一般取所有帧动画的最大时间
      // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
      var duration = 20;
      // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
      var clip = new THREE.AnimationClip("default", duration, [posTrack]);//, colorKF, scaleTrack
      /**
       * 播放编辑好的关键帧数据
       */
      // group作为混合器的参数，可以播放group中所有子对象的帧动画
      var mixer = new THREE.AnimationMixer(bingdd);
      // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
      var AnimationAction = mixer.clipAction(clip);
      //通过操作Action设置播放方式
      AnimationAction.timeScale = 20;//默认1，可以调节播放速度
      // AnimationAction.loop = THREE.LoopOnce; //不循环播放
      AnimationAction.play();//开始播放

      render();
    }


  }, []);
  return (
    <div ref={refDiv}>
      <div className="z-100w">100px</div>
    </div>
  );
}
