export const updatePlanesSizeAndPosition = ({
  handleIsScreenLarger960,
  isScreenLarger960,
  sizes,
  camera,
  planes,
  renderer,
  isProjectPage,
}) => {
  handleIsScreenLarger960(window.innerWidth > 960);

  sizes.current.width = window.innerWidth;
  sizes.current.height = window.innerHeight;
  sizes.current.aspect = sizes.current.width / sizes.current.height;

  // Met à jour l'orthographic camera
  camera.current.aspect = sizes.current.aspect;
  camera.current.updateProjectionMatrix();

  planes.current.forEach(({ plane, htmlElement, index }) => {
    if (!htmlElement) return;

    const distance = 6 - 0; // Position du plan
    const height = 2 * Math.tan((35 * Math.PI) / 360) * distance;
    const width = height * sizes.current.aspect;

    // Adapter la taille du Plane pour qu'il ne dépasse pas

    if (!isScreenLarger960) {
      plane.scale.setScalar(width * 0.55);

      plane.position.x = 0;

      if (!isProjectPage) {
        plane.position.y = index === 0 ? -5 : index === 1 ? -8.25 : -11.75;
      } else {
        plane.position.y = index === 0 ? -5 : index === 1 ? -8.25 : -11.5;
      }
    }

    if (isScreenLarger960) {
      plane.scale.setScalar(width * 0.34);

      plane.position.x =
        index % 2 === 0
          ? -width / 2 + plane.scale.x * 1 - 0.225
          : width / 2 - plane.scale.x * 1 + 0.25;

      if (!isProjectPage) {
        plane.position.y = index === 0 ? -3.8 : index === 1 ? -6.9 : -10.5;
      } else {
        plane.position.y = index === 0 ? -4.275 : index === 1 ? -7.475 : -10.7;
      }
    }
  });

  renderer.current.setSize(sizes.current.width, sizes.current.height);
  renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
