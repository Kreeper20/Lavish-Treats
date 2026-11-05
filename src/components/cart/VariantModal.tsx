import { IconX } from "@tabler/icons-react";

type VariantModalProps = {
  showModal: boolean;
  onClose: () => void;
  onVariantSelected?: () => void;
};

export const VariantModal = ({
  showModal,
  onClose,
  onVariantSelected,
}: VariantModalProps) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IconX size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Select a Variant</h2>
        {/* Add your variant selection UI here */}
        <button
          onClick={() => {
            if (onVariantSelected) onVariantSelected();
            onClose();
          }}
          className="mt-4 bg-purple-deep text-white px-4 py-2 rounded hover:bg-purple-bright transition-colors duration-300"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}
