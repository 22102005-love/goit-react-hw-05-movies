export default function Cost({ actors }) {
  const actorsWithProfilePhoto = actors.filter(
    actor => actor.profile_path !== null,
  );

  return (
    <>
      {actors && (
        <ul>
          {actorsWithProfilePhoto.map(actor => (
            <li key={actor.id}>
              <p>{actor.name}</p>
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
              ></img>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
