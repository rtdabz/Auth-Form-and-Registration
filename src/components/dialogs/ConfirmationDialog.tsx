import React, { useState } from 'react';
import {
  AlertTriangle,
  Trash2,
  Calendar,
  FileText,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';

export const ConfirmationDialog: React.FC = () => {
  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  // Interaction feedback states
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedItem, setDeletedItem] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleDeleteQ3 = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setDeletedItem('Q3 Roadmap');
      setActionFeedback('“Q3 Roadmap” was permanently deleted from the workspace.');
    }, 750);
  };

  const handleDiscardChanges = () => {
    setIsDiscardModalOpen(false);
    setActionFeedback('Unsaved draft modifications were discarded.');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 px-1 sm:px-0 text-left">
      {/* Action Notification Toast / Banner */}
      {actionFeedback && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <span className="break-words">{actionFeedback}</span>
          </div>
          {deletedItem && (
            <Button
              size="sm"
              variant="outline"
              className="text-white border-slate-700 hover:bg-slate-800 hover:text-white shrink-0 w-full sm:w-auto"
              onClick={() => {
                setDeletedItem(null);
                setActionFeedback('“Q3 Roadmap” restored from backup simulation.');
              }}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Undo
            </Button>
          )}
        </div>
      )}

      {/* Main Feature Showcase: Interactive Example */}
      <Card className="p-4 sm:p-8">
        <div className="border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] sm:text-xs font-semibold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            Standard Requirement #3
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Action-Based Confirmation Dialogs
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Use explicit action buttons instead of vague “Yes” or “OK”. Identify the targeted
            resource and explicitly state the consequences before allowing destructive actions.
          </p>
        </div>

        {/* Selected Item Mock Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 sm:p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 mt-0.5 shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                    {deletedItem ? (
                      <span className="line-through text-slate-400">Q3 Roadmap</span>
                    ) : (
                      'Q3 Roadmap'
                    )}
                  </h3>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-100 text-indigo-700">
                    Strategy Doc
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Updated 2h ago
                  </span>
                  <span>14 Milestones</span>
                  <span>38 Tasks</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              {deletedItem ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDeletedItem(null)}
                  leftIcon={<RotateCcw className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Restore Item
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteModalOpen(true)}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Delete Item
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Common Action Triggers */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsDiscardModalOpen(true)}
            className="w-full sm:w-auto justify-center"
          >
            Test: Discard Changes Dialog
          </Button>
        </div>
      </Card>

      {/* Comparison: Bad Practice vs Good Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Anti-Pattern */}
        <Card className="p-4 sm:p-6 border-rose-200/80 bg-rose-50/20">
          <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs sm:text-sm mb-3">
            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Avoid: Ambiguous Confirmation</span>
          </div>
          <div className="bg-white border border-rose-200 rounded-lg p-3.5 sm:p-4 shadow-sm space-y-2.5 opacity-90">
            <h4 className="font-semibold text-slate-800 text-sm">Are you sure?</h4>
            <p className="text-xs text-slate-500">Do you want to proceed with this action?</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <span className="px-3 py-1.5 text-xs rounded border border-slate-300 text-slate-600">
                Cancel
              </span>
              <span className="px-3 py-1.5 text-xs rounded bg-indigo-600 text-white">
                OK / Yes
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            <strong>Problem:</strong> “Yes” and “OK” don't state what will happen. Users scanning
            quickly often click without reading, resulting in accidental data loss.
          </p>
        </Card>

        {/* Best Practice */}
        <Card className="p-4 sm:p-6 border-emerald-200/80 bg-emerald-50/20">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs sm:text-sm mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Standard: Explicit Action Buttons</span>
          </div>
          <div className="bg-white border border-emerald-200 rounded-lg p-3.5 sm:p-4 shadow-sm space-y-2.5">
            <h4 className="font-semibold text-slate-800 text-sm">Delete “Q3 Roadmap”?</h4>
            <p className="text-xs text-slate-600">
              Permanently removes this document and 14 milestones.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <span className="px-3 py-1.5 text-xs rounded border border-slate-300 text-slate-700 font-medium">
                Cancel
              </span>
              <span className="px-3 py-1.5 text-xs rounded bg-rose-600 text-white font-medium">
                Delete
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            <strong>Standard:</strong> Action verbs match intent (“Delete”), red destructive styling
            signals permanent consequence, and item is identified in title.
          </p>
        </Card>
      </div>

      {/* 1. Modal Dialog: Delete “Q3 Roadmap”? */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Delete “Q3 Roadmap”?"
        maxWidth="md"
        footer={
          <>
            <Button
              variant="secondary"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              isLoading={isDeleting}
              onClick={handleDeleteQ3}
              leftIcon={!isDeleting && <Trash2 className="w-4 h-4" />}
            >
              Delete
            </Button>
          </>
        }
      >
        <div className="space-y-3.5 text-xs sm:text-sm">
          {/* Warning Banner */}
          <div className="flex items-start gap-2.5 p-3 sm:p-3.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-800">
            <AlertOctagon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Permanent Deletion Warning</p>
              <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
                This action cannot be undone. The selected item and its associated data will be
                purged from the database.
              </p>
            </div>
          </div>

          {/* Identified Item Summary */}
          <div className="p-3 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
            <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              Selected Resource
            </span>
            <div className="font-semibold text-slate-900 text-sm">
              Q3 Roadmap (Strategic Document)
            </div>
            <p className="text-slate-500">
              Contains 14 milestones, 38 tasks, 4 integrations, and 8 attached assets.
            </p>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Please confirm that you want to delete this resource. If you have team members currently
            working on this roadmap, their unsaved edits will be aborted.
          </p>
        </div>
      </Modal>

      {/* 2. Modal Dialog: Discard Unsaved Changes */}
      <Modal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        title="Discard Unsaved Changes?"
        maxWidth="md"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDiscardModalOpen(false)}
            >
              Keep Editing
            </Button>
            <Button
              variant="destructive"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs sm:text-sm">
          <p className="text-slate-700">
            You have unsaved changes in your document editor that have not been published.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>3 unsaved draft modifications will be lost permanently.</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
