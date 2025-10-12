"use client";

import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './RichTextEditor.css';

// Componente da Barra de Ferramentas
const MenuBar = ({editor}) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="tiptap-toolbar">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active toolbar-button' : 'toolbar-button'}>
                <strong>B</strong>
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active toolbar-button' : 'toolbar-button'}>
                <em>I</em>
            </button>
            <button type="button" onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active toolbar-button' : 'toolbar-button'}>
                P
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active toolbar-button' : 'toolbar-button'}>
                • Lista
            </button>
        </div>
    );
};

// Componente Principal do Editor
export default function RichTextEditor({content, onChange}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({editor}) => {
            onChange(editor.getHTML());
        },
        // A CORREÇÃO ESTÁ AQUI:
        // Esta linha diz ao Tiptap para esperar o ambiente do navegador
        // antes de tentar renderizar o editor, evitando erros de hidratação.
        immediatelyRender: false,
    });

    return (
        <div className="tiptap-container">
            <MenuBar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    );
}