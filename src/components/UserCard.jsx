const UserCard = ({user}) => {
    const {firstName, lastName, gender, age, photoUrl, about} = user
  return user && (
    <div className="card bg-base-300 flex w-96 shadow-sm p-4 m-4">
      <figure>
        <img
        className="w-[240px] h-[240px] m-2"
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && age && <p>{age + ", " + gender}</p>}
        <p className="line-clamp-4">
          {about}
        </p>
        <div className="card-actions justify-between">
          <button className="btn btn-soft btn-primary rounded-full"><i className="bi text-2xl bi-ban"></i></button>
          <button className="btn btn-soft btn-primary rounded-full"><i className="bi text-2xl bi-heart-fill"></i></button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
