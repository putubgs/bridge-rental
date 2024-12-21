import ExperienceCard from "../card/experience-card";

export default function ExperienceSection() {
  return (
    <div className="z-0 md:px-20 px-1 md:py-12 pb-6">
      <section className="mx-auto flex max-w-screen-2xl justify-between gap-11">
        <div className="-z-10 grid grow grid-cols-3 gap-2 px-2">
          <ExperienceCard
            img="/assets/img/door.png"
            text="YOUR CAR AT YOUR DOOR"
          />
          <ExperienceCard
            img="/assets/img/growing-fleet.png"
            text="NATION FASTEST GROWING FLEET"
          />
          <ExperienceCard
            img="/assets/img/car-group.png"
            text="ENDLESS CAR OPTION"
          />
        </div>
        <div className="md:block hidden shrink-0 basis-2/5 space-y-1">
          <h2 className="text-xl font-semibold">
            Experience Convenience Like Never Before
          </h2>
          <p className="text-justify">
            We deliver the car to your doorstep and ensure a hassle-free return,
            prioritizing your comfort and satisfaction for both road trips and
            daily use.
          </p>
        </div>
      </section>
    </div>
  );
}
