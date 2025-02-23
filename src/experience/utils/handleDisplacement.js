export const handleDisplacement = (
  event,
  displacement,
  sizes,
  planes,
  isProjectPage
) => {
  displacement.screenCursor.set(
    (event.clientX / sizes.current.width) * 2 - 1,
    -(event.clientY / sizes.current.height) * 2 + 1
  );

  if (displacement.currentIntersect) {
    if (displacement.currentIntersect.object === planes.current[0].plane)
      displacement.aberrationIntensity[0] = Math.min(
        1.0,
        displacement.aberrationIntensity[0] + 0.2
      );
    if (displacement.currentIntersect.object === planes.current[1].plane)
      displacement.aberrationIntensity[1] = Math.min(
        1.0,
        displacement.aberrationIntensity[1] + 0.2
      );
    if (
      isProjectPage &&
      displacement.currentIntersect.object === planes.current[2].plane
    )
      displacement.aberrationIntensity[2] = Math.min(
        1.0,
        displacement.aberrationIntensity[2] + 0.2
      );
  }
};
