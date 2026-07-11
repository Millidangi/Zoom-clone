type Props = {
  onNewMeeting: () => void;
  onScheduleMeeting: () => void;
  onJoinMeeting: () => void;
};

export default function DashboardCards({
  onNewMeeting,
  onScheduleMeeting,
  onJoinMeeting,
}: Props) {
  const cards = [
    {
      title: "New Meeting",
      subtitle: "Start an instant meeting",
      icon: "📹",
      color: "bg-orange-500 hover:bg-orange-600",
      action: onNewMeeting,
    },
    {
      title: "Join Meeting",
      subtitle: "Enter a meeting ID",
      icon: "➕",
      color: "bg-blue-500 hover:bg-blue-600",
      action: onJoinMeeting,
    },
    {
      title: "Schedule",
      subtitle: "Plan your next meeting",
      icon: "📅",
      color: "bg-green-500 hover:bg-green-600",
      action: onScheduleMeeting,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {cards.map((card) => (

        <button
          key={card.title}
          onClick={card.action}
          className={`${card.color}
            h-48 rounded-3xl p-7
            text-left text-white
            shadow-xl
            transition-all duration-300
            hover:scale-105
            hover:shadow-2xl
            active:scale-95`}
        >

          <div className="flex justify-between items-start">

            <div>

              <div className="text-5xl mb-6">
                {card.icon}
              </div>

              <h2 className="text-2xl font-bold">
                {card.title}
              </h2>

              <p className="mt-2 text-white/90 text-sm">
                {card.subtitle}
              </p>

            </div>

            <div className="text-3xl opacity-70">
              →
            </div>

          </div>

        </button>

      ))}

    </div>
  );
}