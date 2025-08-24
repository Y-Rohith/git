
// Minimal Three.js background with a glowing torus-knot for futuristic vibe
(function(){
  const canvas = document.getElementById("bg-webgl");
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  function size() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  }
  size();
  window.addEventListener("resize", size);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  const geo = new THREE.TorusKnotGeometry(1.2, 0.3, 220, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x5ee1ff,
    emissive: 0x0a0f10,
    metalness: 0.7, roughness: 0.15,
    transparent: true, opacity: 0.75
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  const light1 = new THREE.PointLight(0x5ee1ff, 2, 30); light1.position.set(5, 5, 6); scene.add(light1);
  const light2 = new THREE.PointLight(0x7cffc4, 2, 30); light2.position.set(-4, -2, 6); scene.add(light2);
  const amb = new THREE.AmbientLight(0x334455, 0.8); scene.add(amb);

  function animate(t) {
    mesh.rotation.x = t * 0.0002;
    mesh.rotation.y = t * 0.0003;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
