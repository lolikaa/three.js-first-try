
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
      pointLight.position.y = 50;
      pointLight.position.z = 130;
  
      // add to the scene
      scene.add(pointLight);
  
  // variables for a figure
  const radius=10;
  const tube=9.6;
  const radialSegments=16;
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
  
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const myObject = new THREE.Mesh( geometry, figureMaterial );
  scene.add( myObject );
  
  camera.position.z = 60;

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();

  
  function animate() {
      requestAnimationFrame( animate );

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
    
      renderer.render( scene, camera );
  }
  animate();
  
//   myObject.rotation.x += 0.01;
//   myObject.rotation.y += 0.01;