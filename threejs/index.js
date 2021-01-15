
const scene_atributes = {
    "ambient light": 0xc61f1f
  }
  
  const scene = new THREE.Scene(scene_atributes);
  scene.background = new THREE.Color(0xe3e0c3);
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.9, 1000 );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  
  // Get the DOM element to attach to
      const container =
          document.querySelector('#container');
  container.appendChild(renderer.domElement);
  
      // create a point light
      const pointLight =
        new THREE.PointLight(0xFFFFFF);
  
   // set its position
      pointLight.position.x = 10;
      pointLight.position.y = 8;
      pointLight.position.z = 30;
      // add to the scene
      scene.add(pointLight);
  
  // variables for a figure
  const radius=10;
  const tube=9.6;
  const radialSegments=36;
  const tubularSegments=8;
  const arc=6.3;
  
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
  
 // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const myObject = new THREE.Mesh( geometry, figureMaterial );

  scene.add( myObject );
  
  camera.position.z = 60;


  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();

 
  


// variables to next functionality
  let status = 'start';
  const button_start_stop = document.getElementById("moveBtn");
  let data = document.getElementsByClassName('isVisible');
  let btn1 = document.getElementById("change1");
  let btn2 = document.getElementById("change2");
  let btn3 = document.getElementById("change3");
    // when we click main button
  button_start_stop.addEventListener('click', () =>{
    // when btn is enable
    if(status=='start'){
        controls.autoRotate = true;
        controls.autoRotateSpeed=9;

        // btn controll
        show_btns(data);
        button_start_stop.innerHTML = 'STOP';
        return status = 'stop';
    }

    if(status =='stop'){
        controls.autoRotate=false;
        hide_btns(data);
        button_start_stop.innerHTML = 'START';
        return status = 'start';
    }
  });

  // btns 1,2,3 show only when main btn was press 
    function show_btns(data){
        for(i=0; i<data.length;i++) data[i].style.visibility = 'visible';
    }

    function hide_btns(data){
        for(i=0; i<data.length;i++) data[i].style.visibility = 'hidden';
    }

    btn1.addEventListener('click', () => {

        // switch color and rotate
        console.log('Kliknieto btn 1');
        let random = Math.floor(Math.random()*16777215).toString(16);
        let randomColor='0x'+random;

        myObject.material.color.setHex(randomColor);

        myObject.rotation.x += parseFloat("0."+random);
        myObject.rotation.y += parseFloat("0."+random);
        myObject.rotation.z += parseFloat("0.0"+random);
    });

    // switch to different mesh
    btn2.addEventListener('click', () => {
        console.log('Kliknieto btn 2');
          let newMesh = new THREE.MeshPhongMaterial({
            color: 0xe0c3e3,
            reflectivity: .5,
            refractionRatio: 1
         })
          myObject.material = newMesh;
          myObject.material.nedsUpdate = true;
    });


    btn3.addEventListener('click', () => {
        console.log('Kliknieto btn 3');
        // TODO
    // do some things
    });


    btn_lamp1.addEventListener('click', () => {
          // create a Hemisphere light
          const light1 =
          new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );

          light1.visible = true;
        // add to the scene
        scene.add(light1);
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
  