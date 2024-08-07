'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { LayoutDashboard, Newspaper, Folders, CreditCard, Settings, User } from "lucide-react";
import styles from '@/styles/CommandItem.module.scss';

const Sidebar = () => {
  const [shortcutKey, setShortcutKey] = useState( 'Ctrl' );

  useEffect( () => {
    if ( navigator.userAgent.indexOf( "Mac" ) !== -1 ) {
      setShortcutKey( '&#8984' );
    }
  }, [] );

  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Type a command or search..." />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          <CommandItem className={styles.CommandItem + ' hover:!bg-slate-200'}>
            <LayoutDashboard className="mr-2 w-4 h-4"/>
            <Link href='/'>Dashboard</Link>
          </CommandItem>
          <CommandItem className={styles.CommandItem + ' hover:!bg-slate-200'}>
            <Newspaper className="mr-2 w-4 h-4" />
            <Link href='/posts'>Posts</Link>
          </CommandItem>
          <CommandItem className={styles.CommandItem + ' hover:!bg-slate-200'}>
            <Folders className="mr-2 w-4 h-4" />
            <Link href='#'>Categories</Link>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem className={styles.CommandItem + ' hover:!bg-slate-200'}>
            <User className='mr-2 w-4 h-4' />
            <span>Profile</span>
            <CommandShortcut>
              { shortcutKey + ' P' }
            </CommandShortcut>
          </CommandItem>
          <CommandItem className={styles.CommandItem + ' hover:!bg-slate-200'}>
            <CreditCard className='mr-2 w-4 h-4' />
            <span>Billing</span>
            <CommandShortcut>
              { shortcutKey + ' B' }
            </CommandShortcut>
          </CommandItem>
          <CommandItem className={styles.CommandItem + ' hover:!bg-slate-200'}>
            <Settings className='mr-2 w-4 h-4' />
            <span>Settings</span>
            <CommandShortcut>
              { shortcutKey + ' S' }
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
