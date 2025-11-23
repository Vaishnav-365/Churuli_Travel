import { Location } from "@/app/generated/prisma";
import { reorderItinerary } from "@/lib/actions/reorder-itineraty";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState } from "react";

interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
}

function SortableItem({ item }: { item: Location }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="p-4 bg-white/80 backdrop-blur-xl border border-blue-100/50 rounded-xl flex justify-between items-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-move"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-gray-800 text-lg"> {item.locationTitle}</h4>
          <p className="text-sm text-gray-500 truncate max-w-xs">
            {" "}
            {`Latitude: ${item.lat}, Longitude: ${item.lng}`}
          </p>
        </div>
      </div>
      <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium shadow-lg">
        Day {item.order}
      </div>
    </div>
  );
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  const id = useId();
  const [localLocation, setLocalLocation] = useState(locations);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((item) => item.id === active.id);
      const newIndex = localLocation.findIndex((item) => item.id === over!.id);

      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex
      ).map((item, index) => ({ ...item, order: index }));

      setLocalLocation(newLocationsOrder);

      await reorderItinerary(
        tripId,
        newLocationsOrder.map((item) => item.id)
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50/30 via-cyan-50/30 to-white rounded-xl p-6 border border-blue-100/50">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg mr-3">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-800">Drag to Reorder</h3>
      </div>
      
      <DndContext
        id={id}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localLocation.map((loc) => loc.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {localLocation.map((item, key) => (
              <SortableItem key={key} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
