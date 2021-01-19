
const scene_atributes = {
    "ambient light": 0xc61f1f
  }
  
  const scene = new THREE.Scene(scene_atributes);
  scene.background = new THREE.Color(0xe3e0c3);
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.9, 1000 );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    'https://cdn.eso.org/images/publicationjpg/pao-horalek-lasera-eq-ext.jpg',
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt;
    });

  // Get the DOM element to attach to
      const container =
          document.querySelector('#container');
  container.appendChild(renderer.domElement);
  
      // create a point light
      const pointLight =
        new THREE.PointLight(0xFFFFFF, 0.5);
  
   // set its position
      pointLight.position.x = 10;
      pointLight.position.y = 8;
      pointLight.position.z = 30;
      // // add to the scene
      // scene.add(pointLight);

     // create a Hemisphere light
       const light1 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );
  
  // variables for a figure
  const radius=14;
  const tube=9.6;
  const radialSegments=56;
  const tubularSegments=28;
  const arc=6.3;
  
  // my default mesh material
  const figureMaterial =
        new THREE.MeshLambertMaterial(
          {
            color: 0x2194ce,
            depthTest: true,
            depthWrite: true,
            wireframe: true,
            wireframeLinewidth: 8.1,
            emissive: 0x81008
          });
  
  const geometry = new THREE.TorusGeometry(radius,tube,radialSegments,tubularSegments,arc);
  
 
  const myObject = new THREE.Mesh( geometry, figureMaterial );
  scene.add( myObject );
  
  camera.position.z = 60;


  const controls = new THREE.OrbitControls(camera, renderer.domElement, myObject);
 // controls.update();

 
  


// variables to next functionality
  let status = 'start';
  const button_start_stop = document.getElementById("moveBtn");
  let data = document.getElementsByClassName('isVisible');
  let btn1 = document.getElementById("change1");
  let btn2 = document.getElementById("change2");
  let btn3 = document.getElementById("change3");
  let btn4 = document.getElementById("change4");

    // when we click main button
  button_start_stop.addEventListener('click', () =>{
    // when btn is enable
    if(status=='start'){
        controls.autoRotate = true;
        controls.autoRotateSpeed=5;

        // btn controll
        show(data);
        button_start_stop.innerHTML = 'STOP';
        return status = 'stop';
    }

    if(status =='stop'){
        controls.autoRotate=false;
        hide(data);
        button_start_stop.innerHTML = 'START';
        return status = 'start';
    }
  });

  
    function show(data){
        for(i=0; i<data.length;i++) data[i].style.visibility = 'visible';
    }

    function hide(data){
        for(i=0; i<data.length;i++) data[i].style.visibility = 'hidden';
    }

    btn1.addEventListener('click', () => {
        // switch color and rotate
        console.log('Kliknieto btn 1');
        let random = Math.floor(Math.random()*16777215).toString(16);
        let randomColor='0x'+random;

        myObject.material.color.setHex(randomColor);
    });

    // switch to different mesh
    btn2.addEventListener('click', () => {
        console.log('Kliknieto btn 2');
          let newMesh = new THREE.MeshPhongMaterial({
            color: 0xce21c7,
            emissive: 0x637291,
            specular: 0xce2222,
            wireframeLinewidth: 7.5,
            vertexColors: true,
            fog: true,
            reflectivity: .2,
            refractionRatio: 1
         })
          myObject.material = newMesh;
          myObject.material.nedsUpdate = true;
    });


    btn3.addEventListener('click', () => {
        console.log('Kliknieto btn 3');
        // TODO
        const nextMaterial = new THREE.MeshStandardMaterial({
          color: 0x81ce21,
          emissive: 0xdd2929,
          metalness: 0,
          flatShading: true,
          vertexColors: true,
          roughness: 0.2,
        });
        myObject.material = nextMaterial;
        myObject.material.nedsUpdate = true;
    });

    btn4.addEventListener('click', () =>{
      myObject.material = figureMaterial;
      myObject.material.nedsUpdate = true;
    })



// ----------------------------------------- light controll ------------------------------------
    let lamp1=false;
    let lamp2 = false;

    // lights on and off by pressing the button
    btn_lamp1.addEventListener('click', () => {
   //   console.log(`wartosc lamp 1 = ${lamp1}`);
      if(lamp1===false) {
        scene.add(light1);
        return lamp1 = true;
      }
      if(lamp1 === true) {
        scene.remove(light1);
        return lamp1 = false;
      }
    })

    btn_lamp2.addEventListener('click', () => {
      if(lamp2===false) {
        scene.add(pointLight);
        return lamp2 = true;
      }
      if(lamp2 === true) {
        scene.remove(pointLight);
        return lamp2 = false;
      }
    })







    
  
  function animate() {
      requestAnimationFrame( animate );

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
    
      renderer.render( scene, camera );
  }

  window.onload =() => {
    animate();
  }
  