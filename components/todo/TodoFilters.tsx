"use client";
import { useAtom } from 'jotai';
import { todoFiltersAtom, todoSearchAtom } from '@/types/atoms';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TodoFilters() {
  const [filter, setFilter] = useAtom(todoFiltersAtom);
  const [search, setSearch] = useAtom(todoSearchAtom);

  return (
    <div className="space-y-4 mb-4">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
      
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'incomplete' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('incomplete')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}