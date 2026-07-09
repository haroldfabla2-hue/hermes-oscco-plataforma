'use server';

import { prisma } from './prisma';


export async function createLead(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const district = formData.get('district') as string;
    
    if (!name || !phone || !district) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }

    await prisma.lead.create({
      data: {
        name,
        phone,
        district,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating lead:', error);
    return { success: false, error: 'Ocurrió un error al registrarse. Intente de nuevo.' };
  }
}

export async function createCitizenProposal(formData: FormData) {
  try {
    const name = formData.get('citizenName') as string;
    const phone = formData.get('phone') as string;
    const district = formData.get('district') as string;
    const topic = formData.get('topic') as string;
    const description = formData.get('description') as string;
    
    if (!name || !phone || !district || !topic || !description) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }

    // 1. Buscar o crear el ciudadano
    let citizen = await prisma.citizen.findUnique({
      where: { phone }
    });

    if (!citizen) {
      citizen = await prisma.citizen.create({
        data: {
          name,
          phone,
          district
        }
      });
    }

    // 2. Crear el Ticket (Caso)
    await prisma.ticket.create({
      data: {
        citizenId: citizen.id,
        topic,
        subject: `Propuesta sobre ${topic} - ${district}`,
        initialDescription: description,
        status: "NEW",
        priority: "MEDIUM"
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating proposal:', error);
    return { success: false, error: 'Ocurrió un error al enviar la propuesta. Intente de nuevo.' };
  }
}

export async function addTicketNote(formData: FormData) {
  try {
    const ticketId = formData.get('ticketId') as string;
    const content = formData.get('content') as string;
    
    if (!ticketId || !content) {
      return { success: false, error: 'La nota no puede estar vacía' };
    }

    // Obtener el usuario autenticado desde la sesión real
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("@/lib/auth");
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return { success: false, error: 'No autorizado. Inicie sesión.' };
    }

    await prisma.ticketNote.create({
      data: {
        ticketId,
        authorId: session.user.id,
        content
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding note:', error);
    return { success: false, error: 'Error al guardar la nota' };
  }
}

export async function createWork(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const location = formData.get('location') as string;
    const status = formData.get('status') as string;
    const progress = parseInt(formData.get('progress') as string) || 0;
    const beforeImg = formData.get('beforeImg') as string;
    const afterImg = formData.get('afterImg') as string;
    const description = formData.get('description') as string;
    const storytelling = formData.get('storytelling') as string;
    const results = formData.get('results') as string;
    const gallery = formData.get('gallery') as string; // Esperamos JSON string
    
    if (!title || !slug || !location) {
      return { success: false, error: 'Título, slug y ubicación son obligatorios' };
    }

    await prisma.work.create({
      data: {
        title,
        slug,
        location,
        status,
        progress,
        beforeImg,
        afterImg,
        description,
        storytelling,
        results,
        gallery,
        featured: formData.get('featured') === 'on'
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating work:', error);
    return { success: false, error: 'Error al guardar la obra' };
  }
}

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const featuredImg = formData.get('featuredImg') as string;
    const category = formData.get('category') as string;
    
    if (!title || !slug || !content) {
      return { success: false, error: 'Título, slug y contenido son obligatorios' };
    }

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImg,
        category,
        published: formData.get('published') === 'on',
        publishedAt: formData.get('published') === 'on' ? new Date() : null
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: 'Error al guardar la noticia' };
  }
}

export async function createProposal(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const icon = formData.get('icon') as string;

    if (!title || !description || !category) {
      return { success: false, error: 'Título, descripción y categoría son obligatorios' };
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    await prisma.proposal.create({
      data: {
        title,
        slug,
        description,
        category,
        icon: icon || null,
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating proposal:', error);
    return { success: false, error: 'Error al guardar la propuesta' };
  }
}
